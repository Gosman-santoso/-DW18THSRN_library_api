const router = express.Router();

const {
    getBooks,
    getDetailBook,
    deleteBook,
    addBook,
    editBook
} = require("./../controller/dataBook");

const { getUsers, deleteUser } = require("./../controller/dataUser");

const {
    getCategory,
    detailCategory,
    addCategory,
    editCategory,
    deleteCategory
} = require("./../controller/dataCategory");

// Book
router.get("/books", getBooks);
router.get("/book/:id", getDetailBook);
router.post("/books", addBook);
router.patch("/book/:id", editBook);
router.delete("/book/:id", deleteBook);

// User
router.get("/users", getUsers);
router.delete("/book/:id", deleteUser);

// Category
router.get("/categories", getCategory);
router.get("/category/:id", detailCategory);
router.post("/categories", addCategory);
router.patch("/category/:id", editCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;