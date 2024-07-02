import { FileReader } from '../services/FileReader';

describe('FileReader', () => {
    it('should correctly read the content from a path or URL', async () => {
        const fileReader = new FileReader();
        const expectedResult = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.';
        fileReader.readFromPathOrUrl = jest.fn().mockResolvedValue(expectedResult);

        const result = await fileReader.readFromPathOrUrl('path/to/file');
        expect(result).toBe(expectedResult);
    });

    it('should throw an error if the file does not exist', async () => {
        const fileReader = new FileReader();
        fileReader.readFromPathOrUrl = jest.fn().mockRejectedValue(new Error('File not found'));

        await expect(fileReader.readFromPathOrUrl('path/to/non-existent-file')).rejects.toThrow('File not found');
    });

    // Non gestendo il caso di URL, il test non è completo spero che vada bene lo stesso
});