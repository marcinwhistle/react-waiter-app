const EditPostForm = ({ ...props }) => {
  return (
    <div>
      <h1>Table {props.id}</h1>
      <h1>Status {props.status}</h1>
      <h1>
        People {props.peopleAmount} / {props.maxPeopleAmount}
      </h1>
      <h1>Bill {props.bill} $</h1>
    </div>
  );
};

export default EditPostForm;
