const editableJSON = { editable: true, dataType: 'json' };
const editManUUID = { editable: true, dataType: 'uuid', mandatory: true };
const key = { isKey: true, dataType: 'uuid' };
const getStr = (maxLength, mandatory = true, editable = true) => {
    return {
        mandatory,
        editable,
        dataType: 'varchar',
        maxLength
    };
};
module.exports = {
    crosswords: {
        columns: {
            id: key,
            owner: editManUUID,
            binarygrid: editableJSON,
            values: editableJSON,
            clues: editableJSON,
            createddate: editableJSON,
            title: getStr(200, false, true),
            ispublished: { editable: true, dataType: 'boolean' }
        }
    },
    grids: {
        columns: {
            id: key,
            grid: editableJSON
        },
        generateUUID: true
    }
};
