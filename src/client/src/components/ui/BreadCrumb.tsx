import { Link, useLocation } from 'react-router-dom'

const BreadCrumb = () => {
    const { pathname } = useLocation();
    const paths = pathname.split('/').filter(Boolean)
    console.log(paths)

    return (
        <nav className="flex items-center" aria-label="Breadcrumb">
            <ol className="flex items-center text-sm text-gray-500">
                <li>
                    <Link to="/" className="hover:text-gray-900">
                        home
                    </Link>
                    {paths.length > 0 && (
                        <span className="mx-2 text-gray-400">/</span>
                    )}
                </li>

                {paths.map((segment, index) => {
                    const href = "/" + paths.slice(0, index + 1).join("/");
                    const isLast = index === paths.length - 1;

                    return (
                        <li key={href} className="flex items-center">
                            {!isLast ? (
                                <Link to={href} className="hover:text-gray-900">
                                    {segment.replace(/-/g, " ")}
                                </Link>
                            ) : (
                                <span
                                    className="font-medium text-gray-900"
                                    aria-current="page"
                                >
                                    {segment.replace(/-/g, " ")}
                                </span>
                            )}

                            {!isLast && (
                                <span className="mx-2 text-gray-400">/</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    )
}

export default BreadCrumb