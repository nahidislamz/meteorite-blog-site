import { Link } from "react-router-dom";
export default function Footer(){
    return(
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto">
                    <ul class="list-inline text-center">
                        <li class="list-inline-item">
                            <Link to="/">  
                                <span class="fa-stack fa-lg">
                                <i class="fas fa-circle fa-stack-2x"></i>
                                <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                                </span>
                            </Link>
                        </li>
                        <li class="list-inline-item">
                            <Link to="/"> 
                                <span class="fa-stack fa-lg">
                                <i class="fas fa-circle fa-stack-2x"></i>
                                <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                                </span>
                            </Link>
                        </li>
                        <li class="list-inline-item">
                            <Link to="/">                           
                                <span class="fa-stack fa-lg">
                                <i class="fas fa-circle fa-stack-2x"></i>
                                <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <p class="copyright text-muted">Copyright &copy; Meteorite 2020</p>
                    </div>
                </div>
            </div>
      </footer>
     
    );
}