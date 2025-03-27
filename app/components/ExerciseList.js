'use client'

import ExerciseCard from './ExerciseCard'

export default function ExerciseList({ exercises, onSave, onRemove, isSaved }) {
  if (!exercises || exercises.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No exercises found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onSave={onSave}
          onRemove={onRemove}
          isSaved={isSaved(exercise.id)}
        />
      ))}
    </div>
  )
}