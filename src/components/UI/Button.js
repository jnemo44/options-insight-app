

const Button = (props) => {
        return (
          <>
            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                //onClick={props.onClick}
            >
              Submit
            </button>
          </>
        )

}

export default Button;