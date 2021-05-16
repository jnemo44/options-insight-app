import { Link } from 'react-router-dom';


function MainNavigation() {
    return (
        <div>
            <div class="relative bg-white">
                <div class="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
                    <div class="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#">
                            <span class="sr-only">Workflow</span>
                            <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Jasmin B" />
                        </a>
                    </div>
                    <div class="-mr-2 -my-2 md:hidden">
                        <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                            <span class="sr-only">Open menu</span>

                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <nav class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">

                        <Link to="/" class="text-base font-medium text-gray-500 hover:text-gray-900">
                            Trade List
            </Link>

                        <a href="#" class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-green-600 hover:bg-red-700">
                            + New Trade
            </a>

                    </nav>
                    <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        <a href="#" class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                            Sign Out
            </a>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default MainNavigation;