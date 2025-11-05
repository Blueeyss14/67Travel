const TagComponent = ({tagName = 'Tag Name'}) => {
  return (
    <div className="px-3 py-1 bg-blue-300/20 rounded-full w-fit border border-blue-200 mb-1 text-blue-900/60">
      <p className="m-0 text-[0.8rem]">{tagName}</p>
    </div>
  );
};

export default TagComponent;
