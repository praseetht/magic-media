using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MagicMedia.Messaging;
using MagicMedia.Store;
using MassTransit;

namespace MagicMedia.Face
{
    public class FaceService : IFaceService
    {
        private readonly IFaceStore _faceStore;
        private readonly IPersonService _personService;
        private readonly IBus _bus;

        public FaceService(
            IFaceStore faceStore,
            IPersonService personStore,
            IBus bus)
        {
            _faceStore = faceStore;
            _personService = personStore;
            _bus = bus;
        }

        public async Task<MediaFace> AssignPersonByHumanAsync(
            Guid id,
            string personName,
            CancellationToken cancellationToken)
        {
            Person person = await _personService.GetOrCreatePersonAsync(
                personName,
                cancellationToken);

            MediaFace face = await _faceStore.GetByIdAsync(id, cancellationToken);

            face.PersonId = person.Id;
            face.State = FaceState.Validated;
            face.RecognitionType = FaceRecognitionType.Human;

            await _faceStore.UpdateAsync(face, cancellationToken);

            await _bus.Publish(new FaceUpdatedMessage
            {
                Id = face.Id,
                Action = "ASSIGN_BY_HUMAN"
            });

            return face;
            //TODO: Calculate age. Could be done using eventing...
        }

        public async Task<MediaFace> UnAssignAsync(Guid id, CancellationToken cancellationToken)
        {
            MediaFace face = await _faceStore.GetByIdAsync(id, cancellationToken);

            if (face.PersonId.HasValue)
            {
                if (face.RecognitionType == FaceRecognitionType.Computer)
                {
                    face.FalsePositivePersons = face.FalsePositivePersons ?? new List<Guid>();
                    face.FalsePositivePersons.Add(face.PersonId.Value);
                }
                face.PersonId = null;
                face.State = FaceState.New;
                face.RecognitionType = FaceRecognitionType.None;

                await _faceStore.UpdateAsync(face, cancellationToken);
            }

            return face;
        }

        public async Task<MediaFace> ApproveComputerAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            MediaFace face = await _faceStore.GetByIdAsync(id, cancellationToken);

            if (face.RecognitionType == FaceRecognitionType.Computer &&
                face.PersonId.HasValue)
            {
                face.State = FaceState.Validated;

                await _faceStore.UpdateAsync(face, cancellationToken);
            }

            return face;
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            await _faceStore.DeleteAsync(id, cancellationToken);
        }
    }
}
