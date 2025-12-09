import Link from "next/link"

const Footer = () => {
    return (
        <footer className="border-t border-custom-gray py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <Link href={"/"} className="text-xl font-bold mb-4">
                            <span className="text-custom-orange">Tour</span>Rify
                        </Link>
                        <p className="text-gray-400 text-sm">
                            The easiest way to create interactive product tours and onboard users effectively.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/documentation" className="hover:text-custom-orange transition-colors">Documentation</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/about" className="hover:text-custom-orange transition-colors">About</Link></li>
                            <li><Link href="/get-started" className="hover:text-custom-orange transition-colors">Get Started</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-custom-gray pt-8 text-center text-gray-400 text-sm">
                    <p>© 2025 Tourify. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer