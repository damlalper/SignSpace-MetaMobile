export const identifyObject = async (imageBase64: string): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const objects = ['Water', 'Apple', 'Book', 'Pen', 'Cup'];
            const randomObject = objects[Math.floor(Math.random() * objects.length)];
            resolve(randomObject);
        }, 1500); // Simulate network delay
    });
};
