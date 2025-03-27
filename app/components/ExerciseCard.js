'use client'

export default function ExerciseCard({ exercise, onSave, onRemove, isSaved }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-primary-dark">{exercise.name}</h3>
          <span className="inline-block bg-primary-light text-primary-dark text-xs px-2 py-1 rounded-full">
            {exercise.bodyPart}
          </span>
        </div>

        <div className="mt-2 space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold">Target:</span> {exercise.target}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Equipment:</span> {exercise.equipment}
          </p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => isSaved ? onRemove(exercise.id) : onSave(exercise)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${isSaved
              ? 'bg-red-100 text-red-800 hover:bg-red-200'
              : 'bg-secondary-yellow text-primary-dark hover:bg-secondary-dark hover:text-white'
              } transition-colors`}
          >
            {isSaved ? 'Remove' : 'Save'}
          </button>

          <a
            href={exercise.gifUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-pink hover:text-primary-dark text-sm font-medium"
          >
            View Animation
          </a>
        </div>
      </div>
    </div>
  )
}