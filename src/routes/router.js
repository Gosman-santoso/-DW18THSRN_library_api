const router = express.Router();

const { authenticated: auth } = require("../middleware/authentication");
const { register, login, checkAuth } = require("./../controller/auth");

const { upload } = require("../middleware/uploadFile");

const {
    getUsers,
    getDetailUser,
    editUser,
    deleteUser
} = require("./../controller/dataUser");

const {
    getLibrary,
    detailBookmark,
    addLibrary,
    removeBookmark
} = require("./../controller/dataLibrary");

const {
    getAdmBooks,
    getBooks,
    getDetailBook,
    deleteBook,
    addBook,
    editBook
} = require("./../controller/dataBook");

const {
    getCategory,
    detailCategory,
    addCategory,
    editCategory,
    deleteCategory
} = require("./../controller/dataCategory");

// Book
router.get("/booksAdm", auth, getAdmBooks);
router.get("/books", auth, getBooks);
router.get("/book/:id", auth, getDetailBook);
router.post("/books", auth, upload("book"), addBook);
router.patch("/book/:id", auth, editBook);
router.delete("/book/:id", auth, deleteBook);

// User
router.get("/users", auth, getUsers);
router.get("/user/:id", auth, getDetailUser);
router.patch("/user/:id", auth, editUser);
router.delete("/user/:id", auth, deleteUser);

//Library
router.get("/libraries", auth, getLibrary);
router.get("/library/:bookId/:userId", auth, detailBookmark);
router.post("/libraries", auth, addLibrary);
router.delete("/library/:book/:userId", auth, removeBookmark);

// Category
router.get("/categories", auth, getCategory);
router.get("/category/:id", auth, detailCategory);
router.post("/categories", auth, addCategory);
router.patch("/category/:id", auth, editCategory);
router.delete("/category/:id", auth, deleteCategory);

// Auth Login & Register
router.post("/register", register);
router.post("/login", login);
router.get("/auth", auth, checkAuth);

module.exports = router;