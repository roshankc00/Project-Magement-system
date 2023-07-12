const Project=require('../models/Project')
const Client=require('../models/Client')
const {GraphQLObjectType, GraphQLID,GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, graphql}=require('graphql')




// Clienttype
const ClientType=new GraphQLObjectType({
    name:'Client',
    fields:()=>(
        {
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},
    })
})


// project type
const ProjectType=new GraphQLObjectType({
    name:'Project',
    fields:()=>(
        {
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type:ClientType,
            resolve(parent,args){
                return Client.findById(parent.clientId);
            }
        }
    })
})





const RootQuery=new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        projects:{
            type:new GraphQLList(ProjectType),
            resolve(parent,args){
                return Project.find({});
            }

        },
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Project.findById(parent.id);
            }

        },
        clients:{
            type:new GraphQLList(ClientType),
            resolve(parent,args){
                return Client.find({});
            }

        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Client.findById(parent.clientId);
            }

        }
    }
})


// mutations 
const mutation= new GraphQLObjectType({
    name:"Mutations",
    fields:{
        addClient:{
            type:ClientType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                email:{type:GraphQLNonNull(GraphQLString)},
                phone:{type:GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                const client=Client.create({
                    name:args.name,
                    phone:args.phone,
                    email:args.email,
                })
                return client;
            }
        },

        // delete the client 
        deleteClient:{
            type:ClientType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
            },
                resolve(parent,args){
                    return Client.findByIdAndRemove(args.id);
                }
        },


      // Add a project
      addProject: {
        type: ProjectType,
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          description: { type: GraphQLNonNull(GraphQLString) },
          status: {
            type: new GraphQLEnumType({
              name: 'ProjectStatus',
              values: {
                new: { value: 'Not Started' },
                progress: { value: 'In Progress' },
                completed: { value: 'Completed' },
              },
            }),
            defaultValue: 'Not Started',
          },
          clientId: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          const project = new Project({
            name: args.name,
            description: args.description,
            status: args.status,
            clientId: args.clientId,
          });
  
          return project.save();
        },
      },

    //   delete the projects 
    deleteProject:{
        type:ProjectType,
        args:{
            id:{type:GraphQLNonNull(GraphQLID)},
        },
        resolve(parent,args){
            return  Project.findByIdAndRemove(args.id)

        }
    },


    // update the project 
    updateProject:{
        type:ProjectType,
        args:{
            id:{type:GraphQLNonNull(GraphQLID)},
            name: { type:GraphQLString },
            description: { type:GraphQLString },
            status: {
                type: new GraphQLEnumType({
                  name: 'ProjectStatusUpdate',
                  values: {
                    new: { value: 'Not Started' },
                    progress: { value: 'In Progress' },
                    completed: { value: 'Completed' },
                  },
               }),
              
              },
            },
            resolve(parent,args){
               const updatedProject= Project.findByIdAndUpdate(args.id,{
                    name:args.name,
                    description:args.description,
                    status:args.status
                },{new:true})
                return updatedProject;

            }

        }

    }


        
    
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation
})