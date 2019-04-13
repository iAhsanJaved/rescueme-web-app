'use strict'
const uuidv4 = require('uuid/v4');
const randomstring = require('randomstring');

const Node = use('App/Models/Node')

class NodeController {
    async index ({ view }) {
        // Fetch all Nodes
        const nodes = await Node.all()
        
        // Response
        return view.render('nodes.index', { 
            nodes: nodes.toJSON() 
        });
    }
  
    async create({ view }) {
        // Response
        return view.render('nodes.create');
    }

    async store({ response, request, session }) {
        // Request Data
        const data = request.only([
            'name', 'latitude', 'longitude', 'address', 
        ])

        // Generate UUID
        data.id = uuidv4()
        data.key = randomstring.generate(14);

        // Create Node
        await Node.create(data)

        // Response
		session.flash({ message: 'Node has been added.' });
		return response.redirect('back');
    }

    async show({ params, view }) {
        // Find Node
        const node = await Node.findOrFail(params.id)
        
        // Response
        return view.render('nodes.show', { 
            node: node.toJSON() 
        });
    }

    async edit({ params, view }) {
        // Find Node
        const node = await Node.findOrFail(params.id)
        
        // Response
        return view.render('nodes.edit', { 
            node: node.toJSON()
        });
    }

    async update({ params, response, request, session }) {
        // Find Node
        const node = await Node.findOrFail(params.id)
        
        // Request Data
        const data = request.only([
            'name', 'latitude', 'longitude', 'address', 
        ])
        
        // Update Node 
        node.name = data.name
        node.latitude = data.latitude
        node.longitude = data.longitude
        node.address = data.address
        await node.save()
        
        // Response
		session.flash({ message: 'Node has been updated.' });
		return response.redirect('back');
    }

    async destroy({ params, response, session }) {
        // Find Node
        const node = await Node.findOrFail(params.id)
        
        // Delete Node
		await node.delete();
        
        // Response
		session.flash({ message: 'Node has been deleted.' });
		return response.redirect('back');
    }
}

module.exports = NodeController
