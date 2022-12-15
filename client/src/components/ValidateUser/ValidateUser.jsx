import { Link } from "react-router-dom"
import { SlRocket } from "react-icons/sl" 

const ValidateUser = () => {

    return (
        <div className="validate-user bg-blacker w-screen h-screen flex justify-center items-center">
            <div className="flex bg-black flex-col w-validate h-validate p-2">
                <h1 className="">Gracias por unirte a la comunidad de <span className="text-yellow">HenryGram</span>!</h1>
                <p>Tu correo ha sido correctamente verificado</p>
                <Link to="/" className="text-white">
                    <SlRocket className="text-xl text-yellow"/>
                    Inicia sesión y comienza a compartir con otros Henry's
                </Link>
            </div>
        </div>
    )
}

export default ValidateUser