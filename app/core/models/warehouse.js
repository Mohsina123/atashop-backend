const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;
const WarehouseSchema = new Schema({
    name: String,
    contactPersonName: String,
    contactCode: String,
    contactNo: String,
    gstNo: String,
    warehouseAddress: String,
    pincode: String,
    city: String,
    state: String,
    country: String,
    email: String,
    supportPhone: String,
    isDefault: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

}, {
    timestamps: true,
});

WarehouseSchema.plugin(autoIncrement.plugin, {
    model: 'Warehouse',
    field: 'warehouseID',
    startAt: 10000,
    incrementBy: 1
});

const WarehouseModel = mongoose.model('Warehouse', WarehouseSchema);
module.exports = WarehouseModel;
