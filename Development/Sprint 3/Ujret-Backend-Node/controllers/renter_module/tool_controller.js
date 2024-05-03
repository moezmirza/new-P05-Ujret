import Tool from "../../models/renting_module/toolModel.js"
import { TOOL_CATEGORIES } from "../../models/renting_module/toolModel.js"

import { generateUuid } from "../utilities.js"

const getToolCategories = async (req, res) => {
    try {
        res.code(201).send({
            data: TOOL_CATEGORIES,
            event_code: '1',
            message: 'Tool categories found',
            status_code: 201
        })
    } catch (error) {
        res.code(500).send({
            event_code: '2',
            message: error.message || 'Internal server error',
            status_code: 500,
          })
    }

}

const createTool = async (req, res) => {
    try {
        const {
            renter_id, 
            title, 
            description, 
            rent, 
            category, 
            imgURLs,
            address
        } = req.body

        //validate category
        if(!TOOL_CATEGORIES.includes(category)){
            return res.code(400).send({
                event_code: '2',
                message: 'Invalid category',
                status_code: 400
            })
        }

        const tool = new Tool({
            id: generateUuid(),
            renterId:renter_id,
            title,
            description,
            rent,
            category,
            imgURLs,
            address
        })

        const newTool = await tool.save()
        res.code(201).send({
            data: newTool.id,
            event_code: '1',
            message: 'Tool added',
            status_code: 201
        })
        
    } catch (error) {
        res.code(500).send({
            event_code: '2',
            message: error.message || 'Internal server error',
            status_code: 500,
          })
    }

}

const getAllTools = async (req, res) => {
    try {
        const { renter_id } = req.query;

        // Aggregation pipeline to find tools and join with the User collection
        const tools = await Tool.aggregate([
            {
                $match: {
                    renterId: { $ne: renter_id },
                    status: 'AVAILABLE'
                }
            },
            {
                $lookup: {
                    from: "users",  // Assuming the users collection name
                    localField: "renterId",
                    foreignField: "id",
                    as: "renterDetails"
                }
            },
            {
                $unwind: "$renterDetails"
            },
            {
                $project: {
                    id: 1,
                    renterId: 1,
                    title: 1,
                    description: 1,
                    rent: 1,
                    status: 1,
                    createdAt: 1,
                    imgURLs: 1,
                    category: 1,
                    address: 1,
                    renterName: { $concat: ["$renterDetails.firstName", " ", "$renterDetails.lastName"] },
                    renterPhoneNumber: "$renterDetails.phoneNumber"
                }
            }
        ])

        if (!tools || tools.length === 0) {
            return res.code(404).send({
                event_code: '2',
                message: 'No tools found',
                status_code: 404
            });
        }

        res.code(201).send({
            data: tools,
            event_code: '1',
            message: 'Tools found',
            status_code: 201
        });

    } catch (error) {
        res.code(500).send({
            event_code: '2',
            message: error.message || 'Internal server error',
            status_code: 500
        });
    }
}


const getRenterTools = async (req, res) => {
    try {
        const {renter_id} = req.query
        const tools = await Tool.aggregate([
            {
                $match: {
                    renterId: renter_id 
                }
            },
            {
                $lookup: {
                    from: "users",  // Assuming the users collection name
                    localField: "renterId",
                    foreignField: "id",
                    as: "renterDetails"
                }
            },
            {
                $unwind: "$renterDetails"
            },
            {
                $project: {
                    id: 1,
                    renterId: 1,
                    title: 1,
                    description: 1,
                    rent: 1,
                    status: 1,
                    createdAt: 1,
                    imgURLs: 1,
                    category: 1,
                    address: 1,
                    renterName: { $concat: ["$renterDetails.firstName", " ", "$renterDetails.lastName"] },
                    renterPhoneNumber: "$renterDetails.phoneNumber"
                }
            }
        ])
        if(!tools || tools.length === 0){
            return res.code(404).send({
                event_code: '2',
                message: 'No tools found',
                status_code: 404
            })
        }

        res.code(201).send({
            data: tools,
            event_code: '1',
            message: 'Tools found',
            status_code: 201
        })
        
    } catch (error) {
        res.code(500).send({
            event_code: '2',
            message: error.message || 'Internal server error',
            status_code: 500,
          })
    }
}

const updateTool = async (req, res) => {
    try {
        const {tool_id, tool_info} = req.body
        const tool = await Tool.findOne({id: tool_id})
        if(!tool){
            return res.code(404).send({
                event_code: '2',
                message: 'Tool not found',
                status_code: 404
            })
        }

        const updatedTool = await Tool.findOneAndUpdate({id: tool_id}, tool_info, {new: true})
        res.code(201).send({
            data: updatedTool,
            event_code: '1',
            message: 'Tool updated',
            status_code: 201
        })

    } catch (error) {
        res.code(500).send({
            event_code: '2',
            message: error.message || 'Internal server error',
            status_code: 500,
          })
    }
}

const deleteTool = async (req, res) => {
    try {
        const {tool_id} = req.query
        const tool = await Tool.findOne({id: tool_id})
        if(!tool){
            return res.code(404).send({
                event_code: '2',
                message: 'Tool not found',
                status_code: 404
            })
        }

        await Tool.findOneAndDelete({id: tool_id})
        res.code(201).send({
            event_code: '1',
            message: 'Tool deleted',
            status_code: 201
        })

    }
    catch (error) {
        res.code(500).send({
            event_code: '2',
            message: error.message || 'Internal server error',
            status_code: 500,
          })
    }
}

export {
    getToolCategories,
    createTool,
    getAllTools,
    getRenterTools,
    updateTool,
    deleteTool
}