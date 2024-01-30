export default function Input(props) {
  const inputStyle = { width: "300px" };
  
  const handleChange = (event) => {
    props.setText(event.target.value);
  };

  return (
    <div>
      <div className="text-white px-2 mt-6 font-semibold">{props.label}*</div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className="bg-[#081620] rounded-lg text-lg py-1.5 px-2 text-[#99985d] mt-1"
        style={inputStyle}
        onChange={handleChange}
      />
    </div>
  );
}
