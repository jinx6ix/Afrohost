import { ObjectId } from 'mongodb'
import { getDatabase } from './mongodb'
import { User } from './auth'

export interface Page {
  _id: ObjectId
  title: string
  content: string
  authorId: ObjectId
  createdAt: Date
  updatedAt: Date
  isPublished: boolean
}

export async function getPagesForUser(userId: string, page: number = 1, limit: number = 10) {
  const db = await getDatabase()
  const pagesCollection = db.collection<Page>('pages')
  
  const skip = (page - 1) * limit
  
  const [pages, total] = await Promise.all([
    pagesCollection
      .find({ authorId: new ObjectId(userId) })
      .skip(skip)
      .limit(limit)
      .toArray(),
    pagesCollection.countDocuments({ authorId: new ObjectId(userId) })
  ])
  
  return {
    pages: pages.map(page => ({
      ...page,
      _id: page._id.toString(),
      authorId: page.authorId.toString()
    })),
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }
}