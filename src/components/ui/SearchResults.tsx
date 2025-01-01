import React from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

interface SearchResultsProps {
  results: {
    _id: string;
    profileImage?: string;
    userName: string;
  }[];
  onResultClick: (id: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onResultClick }) => {
  const router = useRouter();

  const handleResultClick = (id: string) => {
    onResultClick(id); // Notify parent to close the dropdown
    router.push(`/${id}`); // Navigate to the user's profile
    onResultClick(id);
  };

  return (
    <div className="absolute top-14 left-0 w-full bg-[#272932] rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
      {results?.length > 0 ? (
        results.map((result) => (
          <div
            key={result._id}
            onClick={() => handleResultClick(result._id)}
            className="px-4 py-2 hover:bg-[#1a1c26] cursor-pointer text-white flex items-center gap-3"
          >
            {result.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <FaUserCircle className="text-2xl text-gray-500" />
            )}
            <p>{result.userName}</p>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-[#8F8F8F]">No results found.</div>
      )}
    </div>
  );
};

export default SearchResults;
