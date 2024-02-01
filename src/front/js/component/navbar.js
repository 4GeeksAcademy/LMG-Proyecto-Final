import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 

    function handleLogout() {
        actions.ongLogout();
        actions.adminLogout();
        actions.voluntarioLogout();
        navigate('/');
    }
    
    return (
        <>
        <div className="container-fluid header-container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start py-3">

          <a href="/" class="me-5 brand-name d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">

            <svg width="70" height="62" viewBox="0 0 3186 811" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3186 269.715C3183.47 282.471 3181.39 295.394 3178.24 307.981C3167.12 351.867 3144.02 391.803 3111.54 423.341C3109.79 425.139 3108 426.937 3106.2 428.96C3095.8 437.518 3089 449.673 3087.15 463.011C3082.2 500.884 3051.57 528.192 3013.7 533.811L3006.61 534.991C2999.81 583.372 2972.39 611.355 2923.33 618.435C2917.03 666.365 2889.61 694.18 2840.72 701.653C2838.41 746.1 2808.01 772.622 2775.81 795.154C2732.25 825.609 2669.82 803.864 2650.26 754.416C2649.14 751.55 2648.07 748.797 2646.78 745.144C2634.6 748.129 2621.92 748.458 2609.61 746.111C2597.29 743.763 2585.63 738.793 2575.4 731.539C2565.18 724.285 2556.63 714.915 2550.35 704.067C2544.07 693.219 2540.19 681.147 2538.99 668.669C2532.64 667.601 2526.06 666.927 2519.66 665.298C2500.89 660.788 2484.14 650.196 2472.02 635.173C2459.91 620.151 2453.1 601.542 2452.67 582.248C2452.67 577.753 2451.94 575.055 2447.05 574.1C2382.81 561.907 2354.71 478.913 2401.64 429.971C2402.32 429.147 2402.96 428.284 2403.55 427.386C2292.9 322.31 2309.08 155.311 2402.37 67.4288C2426.54 44.9702 2454.91 27.5102 2485.85 16.0527C2516.8 4.59528 2549.7 -0.633655 2582.67 0.666599C2615.64 1.96685 2648.03 9.77064 2677.97 23.6293C2707.92 37.4879 2734.82 57.128 2757.15 81.4203C2761.69 75.8082 2766.55 70.4614 2771.71 65.4059C2804.14 35.5894 2843.95 14.9777 2887.02 5.70328C2930.08 -3.57119 2974.85 -1.17168 3016.68 12.6536C3058.51 26.4789 3095.89 51.2278 3124.95 84.3402C3154 117.453 3173.68 157.726 3181.95 200.994C3183.42 208.299 3184.6 215.66 3185.89 223.021L3186 269.715ZM2716.86 120.023C2714.21 117.158 2712.3 114.798 2710.11 112.718C2661.33 65.5183 2603 45.9078 2536.52 58.944C2461.49 73.666 2410.91 119.237 2389.61 192.565C2368.31 265.894 2387.48 330.963 2440.98 385.693C2442.24 387.296 2444.05 388.363 2446.07 388.676C2448.08 388.989 2450.14 388.525 2451.82 387.379C2465.4 381.186 2480.35 378.593 2495.22 379.85C2510.09 381.106 2524.39 386.17 2536.74 394.553C2549.09 402.936 2559.07 414.356 2565.72 427.714C2572.37 441.072 2575.48 455.917 2574.73 470.822C2617.67 480.599 2642.73 506.615 2649.7 550.612C2652 550.95 2654.7 551.343 2657.4 551.624C2672.12 552.84 2686.26 557.952 2698.36 566.434C2710.46 574.916 2720.08 586.463 2726.24 599.892C2731.19 610.175 2734.56 614.67 2747.37 612.928C2773.11 609.5 2795.48 619.109 2814.81 636.584C2818.67 640.38 2823.46 643.09 2828.7 644.44C2833.94 645.79 2839.45 645.732 2844.66 644.272C2849.87 642.813 2854.61 640.003 2858.39 636.127C2862.16 632.251 2864.85 627.447 2866.18 622.199C2867.69 616.487 2867.56 610.46 2865.79 604.821C2864.02 599.181 2860.68 594.16 2856.17 590.339C2818.14 552.467 2780.15 514.501 2742.2 476.441C2740.07 474.305 2738.04 472.058 2736.58 470.822L2776.65 430.758C2778.1 433.163 2779.75 435.437 2781.6 437.557C2819.59 475.504 2857.58 513.452 2895.57 551.399C2899.41 555.883 2904.46 559.172 2910.12 560.875C2915.78 562.578 2921.8 562.624 2927.49 561.008C2951.2 554.377 2957.95 526.282 2940.08 508.301C2901.8 469.754 2863.37 431.488 2824.98 393.11L2819.76 387.491L2859.77 347.596C2861.31 349.924 2863.02 352.139 2864.88 354.226C2902.98 392.436 2941.16 430.627 2979.41 468.799C2982.62 472.332 2986.6 475.08 2991.04 476.829C2995.48 478.578 3000.26 479.281 3005.01 478.884C3009.77 478.488 3014.37 477.002 3018.46 474.541C3022.55 472.081 3026.01 468.712 3028.59 464.697C3036.85 451.717 3034.71 436.602 3022.58 424.352C2969.41 371.083 2916.19 317.852 2862.92 264.658C2861.4 263.141 2859.6 261.792 2857.91 260.331L2851 264.209C2828.9 276.315 2803.62 281.341 2778.57 278.608C2753.52 275.874 2729.92 265.512 2710.96 248.925C2689.6 229.651 2670.77 207.625 2650.2 186.216L2716.86 120.023ZM3066.8 390.132C3072.87 383.333 3078.44 377.489 3083.66 371.364C3135.87 309.049 3146.6 230.382 3110.53 162.054C3078.32 100.918 3027.46 64.0012 2958.79 55.2916C2935.53 52.0232 2911.83 53.6754 2889.25 60.1413C2866.66 66.6072 2845.69 77.7427 2827.68 92.827C2792.72 121.765 2761.53 155.367 2728.71 186.89C2728.38 187.227 2728.43 187.902 2728.26 188.801L2740.07 200.432C2771.14 231.393 2812.51 231.618 2843.47 200.825C2849.09 195.206 2854.09 188.744 2859.6 182.395L3066.8 390.132ZM2784.91 698.394C2785.14 692.444 2783.54 686.566 2780.34 681.547C2777.13 676.527 2772.48 672.603 2766.98 670.299C2761.72 667.559 2755.74 666.52 2749.86 667.325C2743.98 668.13 2738.5 670.74 2734.16 674.794C2725.57 682.323 2717.7 690.752 2709.66 698.9C2706.62 701.694 2704.17 705.065 2702.45 708.816C2700.72 712.567 2699.76 716.623 2699.62 720.749C2699.48 724.875 2700.16 728.988 2701.62 732.848C2703.09 736.708 2705.3 740.239 2708.15 743.234C2711.02 746.325 2714.5 748.79 2718.36 750.476C2722.23 752.161 2726.41 753.031 2730.62 753.031C2734.84 753.031 2739.02 752.161 2742.89 750.476C2746.75 748.79 2750.23 746.325 2753.1 743.234C2760.8 735.929 2768.17 728.287 2775.58 720.758C2778.61 717.886 2781 714.412 2782.61 710.561C2784.22 706.71 2785 702.566 2784.91 698.394ZM2467.67 520.494C2472.61 519.5 2477.32 517.594 2481.55 514.875C2493.04 505.155 2503.73 494.539 2513.53 483.127C2523.03 471.889 2520.22 454.245 2509.26 443.794C2504.06 438.608 2497.12 435.532 2489.78 435.158C2482.44 434.784 2475.23 437.14 2469.53 441.771C2458.99 450.933 2449.13 460.849 2440.02 471.44C2436.24 475.638 2433.88 480.915 2433.25 486.529C2432.63 492.143 2433.78 497.811 2436.54 502.738C2442.27 513.695 2451.54 519.932 2467.67 520.494ZM2595.69 558.929L2593.61 557.692C2593.9 551.645 2592.31 545.656 2589.07 540.539C2585.84 535.423 2581.1 531.426 2575.52 529.091C2570.02 526.353 2563.8 525.422 2557.75 526.431C2551.69 527.44 2546.11 530.338 2541.8 534.71C2533.59 542.24 2525.78 550.219 2518.03 558.254C2514.94 561.075 2512.46 564.49 2510.73 568.294C2509 572.098 2508.06 576.212 2507.95 580.39C2507.85 584.568 2508.6 588.723 2510.14 592.606C2511.69 596.489 2514 600.019 2516.95 602.986C2519.89 605.952 2523.4 608.293 2527.28 609.868C2531.15 611.443 2535.3 612.219 2539.48 612.151C2543.66 612.082 2547.78 611.17 2551.59 609.469C2555.41 607.768 2558.85 605.313 2561.69 602.252C2569.67 595.26 2577.18 587.751 2584.17 579.775C2588.63 573.189 2592.49 566.211 2595.69 558.929ZM2592.38 660.072L2594.51 661.252C2594.15 667.183 2595.66 673.077 2598.81 678.114C2601.96 683.15 2606.61 687.077 2612.1 689.347C2617.64 692.177 2623.92 693.19 2630.07 692.242C2636.21 691.294 2641.9 688.432 2646.33 684.065C2654.76 676.311 2662.79 668.163 2670.66 659.847C2673.52 656.94 2675.77 653.498 2677.3 649.719C2678.82 645.941 2679.59 641.898 2679.55 637.823C2679.52 633.748 2678.68 629.72 2677.09 625.969C2675.49 622.218 2673.18 618.818 2670.27 615.962C2667.36 613.106 2663.92 610.851 2660.14 609.326C2656.36 607.8 2652.32 607.033 2648.24 607.07C2644.16 607.106 2640.14 607.945 2636.38 609.539C2632.63 611.132 2629.23 613.448 2626.38 616.356C2618.3 623.648 2610.67 631.436 2603.56 639.675C2599.22 646.061 2595.48 652.833 2592.38 659.903V660.072Z" fill="#B7D2F8"/>
            <path d="M201.303 28.0953V632.988H443.349V804.032H0V28.0953H201.303Z" fill="#B7D2F8"/>
            <path d="M511.968 804.032L643.472 28.0953H842.47L999.826 442.333L1165.95 28.0953H1367.31L1483.64 804.032H1282.34L1225.13 357.204L1037.98 804.032H957.677L778.46 357.204L712.146 804.032H511.968Z" fill="#B7D2F8"/>
            <path d="M1892.54 364.172H2292.89C2292.89 517.797 2261.48 627.144 2168.36 713.228C2086.87 788.861 1993.81 811 1894.9 811C1755.24 811 1659.82 759.81 1597.05 695.809C1538.82 637.596 1485.32 543.364 1485.32 415.361C1485.32 291.742 1534.16 190.599 1601.71 124.519C1665.66 60.5174 1765.75 10.4515 1903.1 10.4515C1975.26 10.4515 2053.21 26.7468 2112.55 62.8212C2173.08 100.076 2223.1 161.717 2251.03 222.234L2059 301.351C2047.34 271.026 2028.11 244.194 2003.14 223.414C1972.92 197.894 1934.45 184.233 1894.9 184.98C1845.33 184.595 1797.63 203.848 1762.21 238.529C1716.86 283.875 1694.78 356.024 1694.78 416.541C1694.78 487.51 1720.4 545.78 1756.59 584.102C1793.8 623.435 1839.21 643.439 1898.55 643.439C1933.45 643.439 1974.19 637.82 2010.27 607.365C2036.22 585.508 2053.2 554.863 2057.99 521.281H1892.54V364.172Z" fill="#B7D2F8"/>
            </svg>

              {/* <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> */}
            </a>
    
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
       
            {/* <li><a href="#" className="nav-link px-2 link-secondary">Home</a></li> */}
            <li><a href="#" className="nav-link px-2">Features</a></li>
            <li><a href="#" className="nav-link px-2">Pricing</a></li>
            <li><a href="#" className="nav-link px-2">FAQs</a></li>
            <li><a href="#" className="nav-link px-2">About</a></li>
          </ul>
    
          <div className="col-md-3 text-end">
            <button type="button" className="btn btn-primary dropdown-toggle  me-2" data-bs-toggle="dropdown" aria-expanded="false">
                ONGs
            </button>
                <ul className="dropdown-menu">
                 {store.auth_ong ? (
                        <>
                            <li><a className="dropdown-item" href={`/tuOng/${localStorage.getItem("id")}`}>Mi perfil</a></li>
                            <li>
                                <a onClick={handleLogout} className="dropdown-item">Cerrar Sesión</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><a className="dropdown-item" href="/addOng">Registra tu ONG</a></li>
                            <li><a className="dropdown-item" href="/ongLogin">Iniciar sesión</a></li>
                        </>
                    )}
                </ul>
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Voluntarios
            </button>
            <ul className="dropdown-menu">
                     {store.auth_voluntario ? (
                            <>
                                <li><a className="dropdown-item" href={`/voluntarioDashboard/${localStorage.getItem("id")}`}>Mi perfil</a></li>
                                <li>
                                    <a onClick={handleLogout} className="dropdown-item">Cerrar Sesión</a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><a className="dropdown-item" href="/voluntarioSignup">Crear cuenta</a></li>
                                <li><a className="dropdown-item" href="/voluntarioLogin">Iniciar sesión</a></li>
                            </>
                        )}
             </ul>
        
          </div>
        </header>
      </div>
      </>
    );
}


// Esta era la versión que ya estaba de favoritos
// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";


// export const Navbar = () => {
//     const { store, actions } = useContext(Context);
//     const navigate = useNavigate(); 

//     function handleLogout() {
//         actions.ongLogout();
//         actions.adminLogout();
//         actions.voluntarioLogout();
//         navigate('/');
//     }
//     const favoritesMap = store.favorites;
//     return (
//         <nav className="navbar navbar-light bg-light">
//             <div className="container">
//                 <Link to="/">
//                     <span className="navbar-brand mb-0 h1">Let me give</span>
//                 </Link>
                
//                 {/* Mostrar el botón de ONG solo si el usuario está autenticado como ONG */}
//                 {store.auth_ong &&
//                     <div className="btn-group">
//                         <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//                             Ongs
//                         </button>
//                         <ul className="dropdown-menu">
//                             <li><a className="dropdown-item" href="/ong">Ong</a></li>
//                             <li><a className="dropdown-item" href="/ongLogin">Ong Login</a></li>
//                             <li><a className="dropdown-item" href="/campaign">Campaign</a></li>
//                             <li><hr className="dropdown-divider"/></li>
//                         </ul>
//                         <button onClick={handleLogout} className="btn btn-primary">Logout</button>
//                     </div>
//                 }

//                 {/* Mostrar el botón de Voluntario solo si el usuario está autenticado como Voluntario */}
//                 {store.auth_voluntario &&
                
//                     <div className="btn-group">
//                          <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
// 							Favorites
// 							<span className="btn btn-warningprimary text-ligth">{favoritesMap.length > 0 ? favoritesMap.length : " " }</span>
// 						</button>
// 						<ul className="dropdown-menu ">
// 							{favoritesMap.map((item, i) => (
// 								<li key={i} className="dropdown-item d-flex justify-content-between">
// 									{item}
// 									<span onClick={() => actions.deleteFavorite(item)}>
// 									<i className="fas fa-trash "></i>
// 									</span>
// 								</li>
// 							))}
                        
                            
//                         </ul>
//                         <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//                 Voluntarios
//                 </button>
//                 <ul className="dropdown-menu">

//                     <li><Link className="dropdown-item" to={`/voluntarioDashboard/${localStorage.getItem("id")}`}>Mi perfil</Link></li>
//                     <li><Link className="dropdown-item" to="/campaign">Todas las campañas</Link></li>
                   
//                 </ul>
                        
//                         <button onClick={handleLogout} className="btn btn-primary">Logout</button>
//                     </div>
//                 }

//                 {store.auth_admin &&
//                     <div className="btn-group">
//                         <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//                         Admin
//                         </button>
//                         <ul className="dropdown-menu">
//                             <li><Link className="dropdown-item" to="/voluntarios"> Voluntarios</Link></li>
//                             <li><Link className="dropdown-item" to="/ong"> ONGS</Link></li>
//                             <li><Link className="dropdown-item" to="/campaign"> Campañas</Link></li>
                           
//                         </ul>
//                         <button onClick={handleLogout} className="btn btn-primary">Logout</button>
//                     </div>
//                 }
//             </div>
//         </nav>
//     );
// }


