const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-10 h-10',
};

const Spinner = ({ size = 'md' }) => (
  <div
    className={`${sizes[size]} animate-spin rounded-full border-2 border-[#076653] border-t-[#E3EF26]`}
  />
);

export default Spinner;
