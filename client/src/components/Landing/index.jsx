import React from 'react';
import Login from '../Login';

function Landing() {
	return (
		<div className="border border-black bg-cover bg-background h-screen w-screen flex items-center justify-evenly bg-black">
			<div className='w-1/3'>
				<h1 className='font-bold my-5 text-yellow text-8xl font-sans'>HenryGram</h1>
				<h3 className='text-white font-bold font-sans'>
					Unete a la comunidad de Henry's, compartí con los demas tus
					experiencias, proyectos, matchea con Henry´s de tu ciudad para
					organizar reuniones o con aquellos que quieran hacer proyectos juntos
				</h3>
			</div>
			<Login />
		</div>
	);
}

export default Landing;
