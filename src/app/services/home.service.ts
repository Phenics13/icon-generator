import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
  constructor() {}
}

export interface Benefit {
  img: string;
  title: string;
  description: string;
}

export const BENEFITS = [
  {
    img: 'assets/img/benefits/efficiency-icon.png',
    title: 'Efficiency',
    description:
      'Save time and effort by quickly generating custom icons for your projects without the need for complex design software',
  },
  {
    img: 'assets/img/benefits/customization-icon.png',
    title: 'Customization',
    description:
      'Tailor icons to fit your specific needs by adjusting colors, shapes, and sizes, ensuring they seamlessly integrate with your branding or design theme',
  },
  {
    img: 'assets/img/benefits/consistency-icon.png',
    title: 'Consistency',
    description:
      'Maintain visual consistency across your projects by easily creating a set of icons with cohesive styles and design elements',
  },
  {
    img: 'assets/img/benefits/scalability-icon.png',
    title: 'Scalability',
    description:
      'Generate icons in various sizes and formats, ensuring they look crisp and clear on any device or platform, from mobile screens to desktop displays',
  },
  {
    img: 'assets/img/benefits/versatility-icon.png',
    title: 'Versatility',
    description:
      'Explore a wide range of icon styles and categories, from simple line icons to detailed illustrations, to suit different design aesthetics and requirements',
  },
  {
    img: 'assets/img/benefits/high-resolution-icon.png',
    title: 'High Resolution',
    description:
      'Icons are high resolution of 1024x1024 so you can modify them in your favorite image editor as needed',
  },
  {
    img: 'assets/img/benefits/affordable-prices-icon.png',
    title: 'Affordable Prices',
    description:
      'Avoid the expense of hiring a designer or purchasing pre-made icon packs by utilizing an affordable and user-friendly icon generator tool',
  },
  {
    img: 'assets/img/benefits/empowerment-icon.png',
    title: 'Empowerment',
    description:
      'Take control of your design projects and express your creativity by effortlessly producing unique and professional-looking icons ',
  },
];

export interface Review {
  img: string;
  name: string;
  title: string;
  description: string;
}

export const REVIEWS = [
  {
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'John Doe',
    title: 'Web Developer',
    description:
      "This icon generator has been a game-changer for my projects. It's incredibly easy to use, and the customization options are fantastic. I can quickly create icons that perfectly match my design vision, saving me so much time and effort. Highly recommended!",
  },
  {
    img: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Jane Smith',
    title: 'Graphic Designer',
    description:
      'As a graphic designer, consistency and versatility are crucial for me, and this icon generator delivers on both fronts. I love the variety of styles available, and the scalability ensures my icons look fantastic on any screen. Plus, the cost-effectiveness is a huge bonus for freelancers like myself. A must-have tool for designers!',
  },
  {
    img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Alex Johnson',
    title: 'App Developer',
    description:
      "I've been using this icon generator for my app projects, and it has been a fantastic resource. The high-resolution icons are perfect for mobile applications, and the customization options allow me to create icons that match my app's branding perfectly. The efficiency and affordability make this tool a must-have for developers!",
  },
  {
    img: 'https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Sarah Brown',
    title: 'Content Creator',
    description:
      "This icon generator is a content creator's dream come true. I can quickly generate icons for my blog posts and social media graphics, and the high-quality images look fantastic on my website. The empowerment I feel when creating custom icons is unmatched, and the affordable prices make it accessible to creators of all levels. I highly recommend it!",
  },
  {
    img: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=1289&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Michael Lee',
    title: 'Marketing Specialist',
    description:
      "I use this icon generator for my marketing campaigns, and it has been a valuable asset. The scalability ensures my icons look great on various platforms, and the customization options allow me to align them with my brand's visual identity. The versatility of styles available makes it easy to find icons that suit different marketing materials. A fantastic tool for marketers!",
  },
];
