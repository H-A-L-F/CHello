import Card from "./Card";

const ListCard = ({ title }) => {
    return (
        <div className="w-72 flex flex-col border-4 border-primary rounded-md px-4 py-2">
            <h2 className="text-primary text-2xl font-bold"> {title} </h2>
            <div className="my-2"></div>
            <Card />
        </div>
    );
}

export default ListCard