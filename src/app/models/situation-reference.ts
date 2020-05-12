export class SituationReference {
    static types = ['URL', 'FILE', 'PICTURE', 'VIDEO', 'VOICE', 'OTHER'];
    static classifiers = ['ATTACHMENT', 'SOURCE', 'OTHER'];
    
    id: string;
    modified: string;
    title: string;
    type: string;
    classifier: string;
    source: string;


    static getSituationReferenceTypes() {
        return this.types;
    }

    static getSituationReferenceClassifiers(): string[] {
        return this.classifiers;
    }

    static typeToIcon(c: string): string {
        switch (c) {
            case 'URL': {
                return "link";
            }
            case 'FILE': {
                return "insert_drive_file";
            }
            case 'PICTURE': {
                return "image";
            }
            case 'VIDEO': {
                return "play_circle_outline";
            }
            case 'VOICE': {
                return "volume_up";
            }
            case 'OTHER': {
                return "panorama_fish_eye";
            }
        }
    }
    static classifierToIcon(c: string): string {
        switch (c) {
            case 'ATTACHMENT': {
                return "attachment";
            }
            case 'SOURCE': {
                return "public";
            }
            case 'OTHER': {
                return "panorama_fish_eye";
            }
        }
    }
}