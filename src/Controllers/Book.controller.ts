import { Request, Response } from "express";
import { BooksModel, IBook } from "../models/Books.Model";

const createBook = async (req: Request, res: Response) => {
  try {
    const RequestBody = req.body;
    const payload: IBook = {
      title: RequestBody.title,
      isbn: RequestBody.isbn,
      edition: RequestBody.edition,
      author_ids: RequestBody.author_ids,
      keywords: RequestBody.keywords,
      status: "A",
    };
    const addedBook = await BooksModel.create(payload);
    res.status(201).json(addedBook);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getallBooks = async (req: Request, res: Response) => {
  try {
    const allBooks = await BooksModel.find({ status: "A" });
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(404).json(error);
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const delId = req.params.id;
    const delBook = await BooksModel.findOneAndReplace(
      { _id: delId, status: "A" },
      { status: "D" },
      { new: true }
    );
    res.status(201).json(delBook);
  } catch (error) {
    res.status(404).json(error);
  }
};
export { createBook, getallBooks, deleteBook };