
const projectsMock = [
    {
      id: 1,
      name: 'Scranton Branch General',
      participants: [1, 2],
      tasks: [
        {
          owner: 1,
          id: 1,
          title: 'Talk to Jenny',
          summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in nisl eu massa fringilla egestas vitae euismod erat. Aliquam quis. ',
          dueDate: '2023-06-01',
          createdDate: '2023-05-29',
          status: 'In Progress'
        },
        {
          owner: 2,
          id: 2,
          title: 'Prepare New Offer',
          summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in nisl eu massa fringilla egestas vitae euismod erat. Aliquam quis. ',
          dueDate: '2023-06-01',
          createdDate: '2023-05-29',
          status: 'To Do'          
        },
        {
          owner: 1,
          id: 3,
          title: 'Register on DMI',
          summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in nisl eu massa fringilla egestas vitae euismod erat. Aliquam quis. ',
          dueDate: '2023-06-05',
          createdDate: '2023-05-29', 
          status: 'Done'        
        },
        {
          owner: 1,
          id: 4,
          title: 'DQ tests for May Sales Report',
          summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in nisl eu massa fringilla egestas vitae euismod erat. Aliquam quis. ',
          dueDate: '2023-06-05',
          createdDate: '2023-05-29',
          status: 'Review'
        }
      ]
    },
    {
      id: 2,
      name: 'Summer Sales Global',
      participants: [2],
      tasks: [
        {
          owner: 1,
          id: 4,
          title: 'DQ tests for May Sales Report',
          summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in nisl eu massa fringilla egestas vitae euismod erat. Aliquam quis. ',
          dueDate: '2023-06-05',
          createdDate: '2023-05-29',
          status: 'Done'
        }
      ]
    },
    {
      id: 3,
      name: 'Acron Branch Liquidation',
      participants: [1, 2],
      tasks: [
        {
          owner: 1,
          id: 4,
          title: 'DQ tests for May Sales Report',
          summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in nisl eu massa fringilla egestas vitae euismod erat. Aliquam quis. ',
          dueDate: '2023-06-05',
          createdDate: '2023-05-29',
          status: 'Review'
        }
      ]
    },
    {
      id: 4,
      name: 'Dunder Mifflin Infinity Dev',
      participants: [1, 2],
      tasks: [
        {
          owner: 1,
          id: 4,
          title: 'DQ tests for May Sales Report',
          summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in nisl eu massa fringilla egestas vitae euismod erat. Aliquam quis. ',
          dueDate: '2023-06-05',
          createdDate: '2023-05-29',
          status: 'Review'
        }
      ]
    },
]
  

  export default projectsMock;