import { Link } from "react-router-dom"
import validatewallpaper from "../../assets/validatewallpaper.jpg"

const ValidateUser = () => {

    return (
        <div className="validate-user w-screen h-screen flex justify-center items-center"
            style={
                {   backgroundImage: `url(${validatewallpaper})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }
            }
        >
            <div className="flex flex-col w-fit h-validate p-4 text-white justify-around items-start bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 ">
                <h1 className=" text-3xl font-semibold">Gracias por unirte a la comunidad de <span className="text-yellow">HenryGram</span>!</h1>
                <p>Tu correo ha sido correctamente verificado, puedes comenzar a compartir con otros Henry's</p>
                <div className="flex justify-center items-center">
                    <Link to="/" className="text-blacker rounded-md border bg-yellow p-2 w-fit">
                        Inicia sesión 
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ValidateUser