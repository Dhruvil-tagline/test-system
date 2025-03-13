import { useState } from "react";
import axios from "axios";

const CreateExam = () => {
    const [examData, setExamData] = useState({
        subjectName: "",
        questions: Array(15)
            .fill()
            .map(() => ({
                question: "",
                answer: "",
                options: ["", "", "", ""],
            })),
        notes: ["", ""],
    });

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const accessToken = "your-access-token-here"; // Replace with actual token

    // Handle question input change
    const handleInputChange = (index, field, value) => {
        const updatedQuestions = [...examData.questions];
        updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
        setExamData({ ...examData, questions: updatedQuestions });
    };

    // Handle options change
    const handleOptionChange = (qIndex, optIndex, value) => {
        const updatedQuestions = [...examData.questions];
        updatedQuestions[qIndex].options[optIndex] = value;
        setExamData({ ...examData, questions: updatedQuestions });
    };

    // Handle answer selection (radio button)
    const handleAnswerChange = (index, value) => {
        const updatedQuestions = [...examData.questions];
        updatedQuestions[index].answer = value;
        setExamData({ ...examData, questions: updatedQuestions });
    };

    // Handle notes change
    const handleNoteChange = (index, value) => {
        const updatedNotes = [...examData.notes];
        updatedNotes[index] = value;
        setExamData({ ...examData, notes: updatedNotes });
    };

    // Handle submission
    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "https://examination.onrender.com/dashboard/Teachers/Exam",
                examData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            alert("Exam Created Successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error creating exam:", error);
            alert("Failed to create exam!");
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Create Exam</h2>

            {/* Subject Name Input */}
            <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Subject Name"
                value={examData.subjectName}
                onChange={(e) => setExamData({ ...examData, subjectName: e.target.value })}
            />

            {/* Question Form */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Question {currentQuestion + 1}</h3>
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Enter question"
                    value={examData.questions[currentQuestion].question}
                    onChange={(e) => handleInputChange(currentQuestion, "question", e.target.value)}
                />

                {/* Options */}
                {examData.questions[currentQuestion].options.map((opt, idx) => (
                    <div key={idx} className="flex items-center space-x-2 mb-2">
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder={`Option ${idx + 1}`}
                            value={opt}
                            onChange={(e) => handleOptionChange(currentQuestion, idx, e.target.value)}
                        />
                    </div>
                ))}

                {/* Answer Selection - Radio Buttons */}
                <label className="block text-sm font-medium">Select Correct Answer</label>
                <div className="mb-2">
                    {examData.questions[currentQuestion].options.map((opt, idx) => (
                        <label key={idx} className="flex items-center space-x-2 mb-1">
                            <input
                                type="radio"
                                name={`answer-${currentQuestion}`} // Unique name per question
                                value={opt}
                                checked={examData.questions[currentQuestion].answer === opt}
                                onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                                className="mr-2"
                            />
                            <span>{opt}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mb-4">
                <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    disabled={currentQuestion === 14}
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                >
                    Next
                </button>
            </div>

            {/* Notes Section */}
            <h3 className="text-lg font-semibold mb-2">Exam Notes</h3>
            {examData.notes.map((note, index) => (
                <input
                    key={index}
                    type="text"
                    className="w-full p-2 border rounded mb-2"
                    placeholder={`Note ${index + 1}`}
                    value={note}
                    onChange={(e) => handleNoteChange(index, e.target.value)}
                />
            ))}

            {/* Submit Button */}
            <button
                className="w-full bg-blue-500 text-white p-2 rounded mt-4"
                onClick={handleSubmit}
            >
                Submit Exam
            </button>
        </div>
    );
};

export default CreateExam;