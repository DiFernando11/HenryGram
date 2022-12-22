import React from 'react';
import Login from '../Login';

function Landing() {
	return (
		<div className="border border-black bg-cover bg-background h-screen w-screen flex flex-col lg:flex-row items-center justify-evenly bg-black">
			<div className="lg:w-1/3">
				<h1 className="font-bold my-5 text-yellow text-6xl font-sans">
					HenryGram
				</h1>
				<h3 className="text-white font-bold font-sans lg:inline hidden">
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
