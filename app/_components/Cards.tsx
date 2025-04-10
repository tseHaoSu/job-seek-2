import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Users, BookOpen } from 'lucide-react'
import React from 'react'

const Cards = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full rounded-xl overflow-hidden hover:shadow-xl hover:border-red-300 hover:scale-105 duration-300 cursor-pointer border-red-100">
          <div className="flex justify-center pt-8 text-red-400">
            <Users size={64} />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Online Course
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              You can choose or be recommended by us to study online courses
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="hidden md:block">
          <Separator orientation="vertical" className="h-full bg-gray-300" />
        </div>

        <Card className="w-full rounded-xl overflow-hidden hover:shadow-xl hover:border-red-300 hover:scale-105 duration-300 cursor-pointer border-red-100">
          <div className="flex justify-center pt-8 text-red-400">
            <BookOpen size={64} />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Personalized Quiz
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              You can choose or be recommended by us to study online courses
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
  )
}

export default Cards