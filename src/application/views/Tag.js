const Tag = ({ icon, text }) => {
    return (
        <div className="flex flex-row bg-primary text-primary-content rounded-md items-center px-2 cursor-pointer">
            {icon}
            <h2 className="text-lg font-bold ml-2">
                {text}
            </h2>
        </div>
    );
}

export default Tag