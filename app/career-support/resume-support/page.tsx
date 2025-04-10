import React from 'react'
import Form from './_components/Form';

const page = () => {
  return (
    <div className="space-y-8 text-center">
      <h1 className="text-4xl font-extrabold lg:text-4xl text-red-900 leading-tight">
        Resume Support
      </h1>
      <h3 className="text-xl md:text-xl text-gray-700 leading-relaxed">
        Resume AI can help you create a resume that stands out. Just fill in the
        form below with your details, and we will generate a resume and give you a structured guidance.
      </h3>
      <Form />
    </div>
  );
}

export default page