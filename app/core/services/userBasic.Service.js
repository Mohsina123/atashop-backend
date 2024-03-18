const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const Constants = require('../../config/constants');
const bcrypt = require('bcrypt');
const puppeteer = require('puppeteer');
const { sendUserBasicCredentials } = require('../../services/send-mail');
const { getMessageByKey, getMessageTypeByKey } = require('../common/common_message');

class userBasicService {

    constructor(userBasicRepo) {
        this.userBasicRepo = userBasicRepo;
    }

    /** 
     * @params
     * @public This function is used for create user and can only be created from these fields
     */
    whitelist = [
        'name',
        'place',
        'email',
        'phone',
        'address',
        'password',
    ];

    /** 
     * @params This function used for filtering params
     */
    filterParams(params, whitelist) {
        const filtered = {};
        for (const key in params) {
            if (whitelist.indexOf(key) > -1) {
                filtered[key] = params[key];
            }
        }
        return filtered;
    }

    /** 
     * @create  used for create new user profile 
     * @returns {user}
     */
    async create(req) {
        //here  filter the body of user (only those fields remain which have to created)
        const params =  this.filterParams(req.body, this.whitelist);

        // main function called from user repository to create a new user
        let userBasic = await this.userBasicRepo.create(params);
        userBasic = await this.login(req.body); 
        var message = getMessageByKey('CREATE');
        var pushType = getMessageTypeByKey('CREATE');
        if(userBasic){
            return { error: false, message, pushType, user : userBasic.data };
        }else {
            return { error: true, message: "Can't create a new user" };
        }  
    }

    /**
     * @private used to get all the users
     * @returns {users}
     */
    async fetchAll(req) {
        let filter = {};
        if (req.query.name) {
            filter['name'] = req.query.name;
        }
        const data = await this.userBasicRepo.fetchAll(filter);
        if(data){
            return { error: false, data: data };
        }else {
            return { error: true, message: "Can't find all users" };
        }
    }

    /**
     * @private used to get the user
     * @returns {user}
     */
    async fetch(params) {
        params = params.id
        const user = await this.userBasicRepo._populate(params);
        if(user){
            return { error: false, data: user } 
        } else{
            return { error: true, message: "Can't find user" }
        } 
    }

    /** 
     * @public used for login
     * @returns {accessToken||object}
     */
    async login(body) {
        // Take email and password from body
        const {
            email,
            password,
        } = body;

        // using email find user's account
        const login = await this.userBasicRepo.login(email);
        console.log('login==>',login)
        if(login) {
            const accessToken = this.generateToken(login);
            login.accessToken = accessToken;

            // here user login's and mongoose's password are compared 
            if (!this.authenticate(password, login.password)) {
                // if false then return error
                return { error: true, message: 'Invalid email or password.' };
            }
            // if true then return an object or access token
            return { error: false, data: login };
        } else {
            return { error: true, message: 'No account found with your email, please create an account.' };
        }
    }

    /** 
     * Used for generating token
     */
    generateToken(userBasic) {
        return jwt.sign({
            _id: userBasic._id,
            email: userBasic.email,
        },  Constants.security.sessionSecret, {
            expiresIn: Constants.security.sessionExpiration,
        });
    }

    /** 
     * @private used to compare password from mongoose and user given
     * @return {boolean}
     */
    authenticate(password, userBasicPassword) {
        return bcrypt.compareSync(password, userBasicPassword);
    }

    /**
     * @private
     * @params  used for delete a user 
     * @returns {boolean}
     */
    async delete(params) {
        const del = await this.userBasicRepo.delete(params)
        if(del){
            // if false then return message
            return { error: false, message: "Delete user success", data:del };
        }else {
            return { error: true, message: "Can't find user" };
        }    
    }

    /**  
     * this function used for encrypt password
     */
    async hashPassword(password, saltRounds = Constants.security.saltRounds, callback) {
        return bcrypt.hash(password, saltRounds, callback);
    }
    
    /**  
     * used for updating users
     * @returns {user}
     */
    async update(body, params) {

        params = params.id
        let user;
        if (body.password) {
            const {
                saltRounds,
            } = Constants.security;
            await this.hashPassword(body.password, saltRounds, async (err, hash) => {
                body.password = hash;
               await this.userBasicRepo.update(params, body)
            });
        } else {
            await this.userBasicRepo.update(params, body)
        }
        user = await this.userBasicRepo._populate(params);
        var message = getMessageByKey('UPDATE');
        if(user) {
            return { error: false, message };
        }else {
            return { error: true, message: "Can't update user" };
        }
    }

    /** 
     * @Pdf This functions is used to generate pdf
    */
    async generateReceipt(params) {
        const id = params;
        let { content } = await this.generateUserBasicPdf(id);
        if(content){
            return content;
        }else {
            return{ error: true, message: "Can't generate pdf" };
        }
    }

    generateUserBasicPdf = async (id) => {
        let pdfObject = {
            filename: '',
            content: '',
        };
        id = id.id;
        const userBasic = await this.userBasicRepo._populate(id)
        let result = fs.readFileSync(path.resolve(__dirname + '../../../views/userBasic.pdf.html'), 'utf-8');
        let name, place, email, phone;

        name  = userBasic.name;
        place = userBasic.place;
        email = userBasic.email;
        phone = userBasic.phone;

        result = result.replace('{{name}}', name);
        result = result.replace('{{place}}', place);
        result = result.replace('{{email}}', email);
        result = result.replace('{{phone}}', phone);
        result = result.replace('{{phone1}}', phone);
        result = result.replace('{{userBasic.createdDate}}', moment(userBasic.createdAt).format('DD.MM.YYYY'));
        result = result.replace('{{userBasicID}}', userBasic._id);
        result = result.replace('{{userBasic.userBasicID}}', userBasic.userBasicID);
        result = result.replace('{{userBasic._id}}', userBasic._id);
        result = result.replace('{{createdAt}}', userBasic.createdAt);

        let htmlStr = '', htmlStr4 = '', htmlStr5 = '', htmlStr6 = '';

        htmlStr += '<tr>' +
            '<th scope="row">' + 1 + '</th>' +
            '<td>' + userBasic.userBasicID + '</td>' +
            '<td>' + '' + '</td>' +
            '<td>' + '' + '</td>' +
            '<td>' + '' + '</td>'
        '</tr>';

        htmlStr4 += '<tr>' +
            '<th>' + 'Pos.' + '</th>' +
            '<th>' + 'Auftrag' + '</th>' +
            '<th>' + 'Stunden' + '</th>' +
            '<th>' + 'Ansatz (std./psch.)' + '</th>' +
            '<th>' + 'Preis' + '</th>'
        '</tr>';

        htmlStr5 += '<tr>' +
            '<th scope="row">' + 1 + '</th>' +
            '<td>' + '' + '</td>' +
            '<td>' + '' + '</td>' +
            '<td>' + 'Anzahl Stunden' + '</td>'
        '</tr>';

        htmlStr6 += '<tr>' +
            '<th>' + 'Pos.' + '</th>' +
            '<th>' + 'Einsatzdatum' + '</th>' +
            '<th>' + 'Auftrags-Nr.' + '</th>' +
            '<th>' + 'Detailinformationen' + '</th>'
        '</tr>';
        result = result.replace('{{userBasic_headers}}', htmlStr4);
        result = result.replace('{{userBasic_area}}', htmlStr);
        result = result.replace('{{currentDate}}', moment().format('MMMM Do YYYY, h:mm:ss a'));

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--disable-web-security', '--disable-features=IsolateOrigins', ' --disable-site-isolation-trials', '--no-sandbox'],
        });

        const page = await browser.newPage();
        await page.setContent(result, { waitUntil: 'networkidle0' });

        pdfObject.filename = `Rechnung-${userBasic.userBasicID}-${name}.pdf`;
        pdfObject.content = await page.pdf({
            displayHeaderFooter: true,
            format: 'A4',
            footerTemplate: '<p></p>',
            margin: {
                top: '280px',
                bottom: '50px',
                left: '100px',
                right: '100px'
            },
        });
        await browser.close();
        if(pdfObject) {
            return pdfObject ;
        } else {
            return { error: true, message: "Can't generate PDF"};
        }    
    }
    
    /** 
     * @sendEmail this functions is used to send mail
    */
    async sendCredentialsMail(id) {
        const userBasic = await this.fetch(id)
        await sendUserBasicCredentials(userBasic.data, userBasic.data.id)
        if(userBasic) {
            return { error: false,  message: "Mail send successfully" };
        } else {
            return { error: true, message: "No email address found."};
        }
    }
}

module.exports = {
    userBasicService
}