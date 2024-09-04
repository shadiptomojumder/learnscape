import { Category } from "@/model/category-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";

export async function getCategories() {
    const categories = await Category.find({}).lean();
    return replaceMongoIdInArray(categories);
}

export async function getCategoryDetails(categoryId:any) {
try {
        const category = await Category.findById(categoryId).lean();
        return replaceMongoIdInObject(category);
    } catch (error:any) {
        throw new Error(error);
    }

}