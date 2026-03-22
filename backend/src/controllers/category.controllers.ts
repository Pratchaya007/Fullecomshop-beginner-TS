import type { Request , Response ,RequestHandler} from "express"
import { categorySchema } from "../validators/auth.validators.js"
import { prisma } from "../db/prisma.js"
import { ZodError } from "zod"

async function categoryAdd(req:Request, res: Response) {
  try{
    const { name } = categorySchema.parse(req.body)
    const createCategory = await prisma.category.create({
      data: { name }
    })
    res.status(200).json({message: 'create category successfuly ' ,data: createCategory})
  }catch (err){
    if(err instanceof ZodError){
      return res.status(400).json({message: 'validation error', error: err.flatten().fieldErrors})
    }
    console.log(err)
    res.status(500).json({message: "Server is Error"})
  }
}
async function categoryList(req:Request, res: Response) {
  try{
    const getcategory = await prisma.category.findMany()
    res.status(200).json({message: 'ok getAll category' , data: getcategory})
  }catch (err){
    console.log(err)
    res.status(500).json({message: "Server is Error"})
  }
}
async function categoryDeleteId(req:Request, res: Response) {
  try{
    const id = Number(req.params.id)
    if (isNaN(id)){
      return res.status(400).json({message: 'Invalid is Params !!'})
    }

    const getcategoryDelete = await prisma.category.findUnique({where : { id }})
    if (!getcategoryDelete){
      return res.status(400).json({message: 'Delete not found'})
    }
    await prisma.category.delete({where: {id}})

    res.status(200).json({message: 'ok getcategoryDelete successfuly'})
  }catch (err){
    console.log(err)
    res.status(500).json({message: "Server is Error"})
  }
}

export const categoryControllers = {categoryAdd , categoryList , categoryDeleteId}