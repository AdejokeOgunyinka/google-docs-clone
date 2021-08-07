const mongoose = require("mongoose");
const Document = require("./document");

mongoose.connect("mongodb+srv://Adejoke:_i5$7CW$rW2-$E$@cluster0.2f8pg.mongodb.net/google-docs-clone?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})


const io = require("socket.io")(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: [ "GET", "POST" ]
    }
 });

const defaultValue = "";

io.on("connection", socket => {
    socket.on("get-document", async documentId => {
        const document = await findOrCreateDocument(documentId);
        socket.join(documentId);
        socket.emit("load-document", document.data);
        socket.on("send-changes", delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta);
        });
        
        socket.on("save-document", async data => {
            await Document.findByIdAndUpdate(documentId, { data })
        })
    })
});

const findOrCreateDocument = async (id) => {
    if(id == null ) return;
    const document = await Document.findById(id);
    if (document) return document;
    return Document.create({_id: id, data: defaultValue});
};
