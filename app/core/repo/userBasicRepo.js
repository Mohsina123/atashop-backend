class userBasicRepository {
    
    constructor(userBasicModel) {
        this.userBasicModel = userBasicModel;
    }

    /**
     * @create for creating user
     */
    create(data) {
        return this.userBasicModel.create(data);
    }

    /**
     * @fetch fetch all users
     */
    fetchAll(filter) {
        return this.userBasicModel.find(filter).sort({ order: 1 });
    }

    /**
     *@update a user
     */
    update(filter, fields) {
        return this.userBasicModel.findByIdAndUpdate(filter, fields);
    }

    /**
     * @delete a user
     */
    delete(id) {
        id=id.id
        return this.userBasicModel.deleteOne({"_id":(`${id}`)});
    }

    /**
     * @find user by id and populate
     */
    _populate(id) {
        return this.userBasicModel.findById(id).populate().exec();
    }

    /**
     * @find user by email
     */
    login(email) {
        return this.userBasicModel.findOne({ email: email }).populate().exec();
    }

}

module.exports = {
    userBasicRepository
}
