import mongoogse from 'mongoose'

const userSchema = new mongoogse.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: 'https://www.google.com/imgres?q=default%20user%20image&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F024%2F983%2F914%2Fsmall_2x%2Fsimple-user-default-icon-free-png.png&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-png%2Fdefault-user&docid=M2luaU4BDF0eXM&tbnid=cXZg5FMbMktxwM&vet=12ahUKEwj0vpbp_LeOAxXoc_UHHSnNAk4QM3oECGUQAA..i&w=400&h=400&hcb=2&ved=2ahUKEwj0vpbp_LeOAxXoc_UHHSnNAk4QM3oECGUQAA'
    },
    password: {
        type: String,
        required: true
    },
    expense: [
        {
            type: mongoogse.Schema.Types.ObjectId,
            ref: "Expense"
        }
    ],
    income: [
        {
            type: mongoogse.Schema.Types.ObjectId,
            ref: "Income"
        }
    ]

    
},{timestamps: true})

export const User = mongoogse.model("User",userSchema);