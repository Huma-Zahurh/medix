const StudyMaterial = require("../Models/StudyMaterialModel");

//  Add Study Material (Upload PDF)
const createStudyMaterial = async (req, res) => {
  try {
    const { title, description, subject, chapter, topic } = req.body;
    const file_url = req.file ? req.file.path : null; // Assuming file upload middleware

    if (!file_url) return res.status(400).json({ message: "PDF file is required" });

    const studyMaterial = new StudyMaterial({ title, description, subject, chapter, topic, file_url });
    await studyMaterial.save();

    res.status(201).json({ message: "Study Material added successfully!", studyMaterial });
  } catch (error) {
    res.status(500).json({ message: "Error adding study material", error });
  }
};

//  Get All Study Materials
const getAllStudyMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().populate('subject chapter topic');
    res.status(200).json({ success: true, materials });
} catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching materials', error });
}
};

// Get Single Study Material
const getMaterialById = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id).populate("subject chapter topic");
    if (!material) return res.status(404).json({ message: "Study Material not found" });

    res.json(material);
  } catch (error) {
    res.status(500).json({ message: "Error fetching study material", error });
  }
};

// Update Study Material
const updateMaterial = async (req, res) => {
  try {
    const { title, description, subject, chapter, topic } = req.body;
    const material = await StudyMaterial.findById(req.params.id);
    if (!material) {
        return res.status(404).json({ success: false, message: 'Material not found' });
    }

    material.title = title;
    material.description = description;
    material.subject = subject;
    material.chapter = chapter;
    material.topic = topic;

    if (req.file) {
        material.file_url = `/uploads/${req.file.filename}`;
    }

    await material.save();
    res.status(200).json({ success: true, message: 'Material updated successfully', material });
} catch (error) {
    res.status(500).json({ success: false, message: 'Error updating material', error });
}
};

// Delete Study Material
const deleteStudyMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    if (!material) {
        return res.status(404).json({ success: false, message: 'Material not found' });
    }

    await material.deleteOne();
    res.status(200).json({ success: true, message: 'Material deleted successfully' });
} catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting material', error });
}
};

module.exports = {
    createStudyMaterial,
    getAllStudyMaterials,
    getMaterialById,
    updateMaterial,
    deleteStudyMaterial 
}