import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

interface ISkill {
    id: number;
    name: string;
    level: string;
}

const fetchSkills = async (): Promise<ISkill[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/skills`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch skills', error);
        return [];
    }
};

const addSkill = async (skill: Omit<ISkill, 'id'>): Promise<ISkill|null> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/skills`, skill);
        return response.data;
    } catch (error) {
        console.error('Failed to add skill', error);
        return null;
    }
};

const updateSkill = async (id: number, skill: Omit<ISkill, 'id'>): Promise<void> => {
    try {
        await axios.put(`${API_BASE_URL}/skills/${id}`, skill);
    } catch (error) {
        console.error(`Failed to update skill with id=${id}`, error);
    }
};

const deleteSkill = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/skills/${id}`);
    } catch (error) {
        console.error(`Failed to delete skill with id=${id}`, error);
    }
};

const displaySkills = async () => {
    const skills = await fetchSkills();
    skills.forEach(skill => {
        console.log(`Skill: ${skill.name}, Level: ${skill.level}`);
    });
};

document.addEventListener('DOMContentLoaded', () => {
});

const addSkillHandler = async (event: Event) => {
    event.preventDefault();
    const name = (document.querySelector('#skill-name') as HTMLInputElement).value;
    const level = (document.querySelector('#skill-level') as HTMLSelectElement).value;
    await addSkill({ name, level });
    displaySkills();
};