export default function Footer() {
    return (
        <footer className="border-t bg-gradient-to-r from-orange-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Developed by{" "}
                        <span className="font-semibold text-[#000080] dark:text-orange-400">
                            Kundu Vinay Kumar Reddy
                        </span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        B.Tech CSE Graduate
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600">
                        Digital Public Seva Portal © {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    );
}
