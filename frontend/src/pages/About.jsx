import React from 'react';
import Title from '../components/Title'
import { assets } from '../assets/assets';
import NewsLatterBox from '../components/NewsLetterBox'

const About = () => {
    return (
        <div className=''>
            <div className="text-2xl text-center pt-8 border-t">
                <Title text1={"ABOUT"} text2={"US"} />
            </div>
            <div className="my-10 flex flex-col md:flex-row gap-16">
                <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni, nam consectetur dolor quaerat fugiat nobis earum, aperiam accusantium delectus alias, iusto autem dignissimos dicta natus tempora maiores maxime laboriosam.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum est atque voluptate possimus, tempora consectetur distinctio eum veniam eos dicta doloribus porro quae, nisi amet veritatis similique doloremque exercitationem voluptatibus.</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis, ea delectus molestias rem nam tempora fugiat culpa aspernatur, ipsa, necessitatibus in explicabo. Beatae corrupti, neque molestias amet unde eveniet quaerat!</p>
                </div>
            </div>
            <div className="text-4xl py-4">
                <Title text1={"WHY"} text2={"CHOOSE US"}/>
            </div>
            <div className="flex flex-col gap-2 md:flex-row text-sm mb-20">
                <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
                    <b>Quality Assures:</b>
                    <p className="text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quibusdam.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
                    <b>Convenience:</b>
                    <p className="text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quibusdam.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
                    <b>Exceptional Customer Service:</b>
                    <p className="text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quibusdam.</p>
                </div>
            </div>
            <NewsLatterBox />
        </div>
    );
}

export default About;
