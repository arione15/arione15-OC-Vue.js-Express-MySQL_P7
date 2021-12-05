exports.isIdUnique = (id, table) => {
    table.findOne({ where: { id }, attributes: ['id'] })
        .then(token => token !== null)
        .then(isUnique => isUnique);
};