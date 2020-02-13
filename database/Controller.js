module.exports.Controller = {
    handlePost: (req, res) => {
        // add a house's data
        const house = req.body;
        addHouse(house)
            .then(() => {
                res.status(200).end()
            })
            .catch((error) => {
                res.status(500).end()
            })
    },
    handleGetAll: (req, res) => {
        // get all houses' data
        getAllHouse()
            .then((houses) => {
                res.status(200).send(houses)
            })
            .catch((error) => {
                res.status(500).end()
            })
    },
    handleGetOne: (req, res) => {
        // get one house with id as paramater 
        const id = req.params.houseId
        getOneHouse(id)
            .then((house) => {
                res.status(200).send(house)
            })
            .catch((error) => {
                res.status(500).end()
            })
    },
    handleUpdate: (req, res) => {
        // update house data with id as parameter
        const id = req.params.houseId
        updateHouse(id)
            .then((house) => {
                res.status(200).send(house)
            })
            .catch((error) => {
                res.status(500).end()
            })
    },
    handleDelete: (req, res) => {
        // delete house data with id as parameter
        const id = req.params.houseId
        removeHouse(id)
            .then(() => {
                res.status(200).end()
            })
            .catch((error) => {
                res.status(500).end()
            }) 
    }
}