import { Injectable } from '@angular/core';
import { MessageService } from '../shared/components/message/message.service';


// ==================================================================================================================
@Injectable()
export class CameraService {

    private static readonly interval = 2000;
    private static readonly prefix = 'data:image/png;base64,';

    private camera;
    private canvas;

    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private messageService: MessageService
    ) {
        this.camera = new (window as any).JpegCamera('#camera', {
            on_ready: () => {
                this.hideSlot();
                document.getElementById('camera').style.display = 'none';
                setInterval(() =>
                    this.camera.capture().get_canvas(canvas =>
                        this.canvas = canvas
                    ),
                    CameraService.interval
                );
            },
            on_error: () => {
                this.hideSlot();
                this.messageService.error('camera.share-error', 'common.error');
            }
        });
    }


    // PUBLIC
    // ==============================================================================================================
    makePicture(): string {

        if (this.canvas) {
            return this.canvas.toDataURL().replace(CameraService.prefix, '');
        }

        return null;
    }


    // PRIVATE
    // ==============================================================================================================
    private hideSlot(): void {

        document.getElementById('camera').style.display = 'none';
    }
}
