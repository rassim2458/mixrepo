import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ProfileCard = ({ imageSrc, username, email, description }) => {
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="card max-h-96 min-h-32 max-w-96 bg-base-100 lg:block my-4 mx-2 hidden lg:sticky shadow-xl">
      <figure className="px-10 pt-10">
        {loading && !imageError && (
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-xl bg-gray-300 h-48 w-72"></div>
          </div>
        )}
        {!imageError && (
          <img
            src={imageSrc}
            alt={`${username}'s profile`}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setImageError(true);
            }}
            className="rounded-xl"
            style={{ display: loading ? 'none' : 'block' }}
          />
        )}
        {imageError && (
          <div className="flex justify-center items-center bg-gray-300 rounded-xl h-48 w-72 text-gray-500">
            Image not available
          </div>
        )}
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-xl font-semibold">{username}</h2>
        <p className="text-sm text-gray-600">{email}</p>
        <h6 className="text-sm text-gray-600">{description}</h6>
       
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  description: PropTypes.string
};
