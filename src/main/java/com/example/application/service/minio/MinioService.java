package com.example.application.service.minio;

import com.example.application.exceptions.FileContainsHarmFulContentException;
import com.example.application.exceptions.MinIOFileCreationException;
import com.example.application.exceptions.MinIOFileNotFoundException;
import com.example.application.service.clamAV.ClamAVService;
import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RequiredArgsConstructor
@Service
@Log4j2
public class MinioService {
    private final MinioClient minioClient;
    private final ClamAVService clamAVService;

    @Value("${minio.bucket-name}")
    private String bucketName;

    public void putObject(String objectName, MultipartFile file) throws MinIOFileCreationException, IOException, FileContainsHarmFulContentException {
        if (!isFileOkayAndDoesNotContainsVirus(file.getResource(), objectName)) {
            throw new FileContainsHarmFulContentException("This " + objectName + " file contains!");
        }
        var inputStream = file.getInputStream();
        try {
            minioClient.putObject(PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(objectName)
                    .stream(inputStream, -1, 10485760)
                    .build());

        } catch (Exception e) {
            // Todo: Add a log statement
            e.printStackTrace();
            throw new MinIOFileCreationException("Unable to create this object " + objectName);
        } finally {
            try {
                inputStream.close();
            } catch (IOException ioException) {
                // Todo: Add a log statement
                ioException.printStackTrace();
            }
        }
    }

    public byte[] getObject(String objectName) throws MinIOFileNotFoundException {
        try (InputStream stream = minioClient
                .getObject(GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .build());) {
            return stream.readAllBytes();

        } catch (ErrorResponseException | InsufficientDataException |
                 InternalException | InvalidKeyException | InvalidResponseException |
                 IOException | NoSuchAlgorithmException | ServerException |
                 XmlParserException | IllegalArgumentException e) {

            //todo: add the logger message
            throw new MinIOFileNotFoundException("Unable to find the file with " + objectName);
        }
    }

    private boolean isFileOkayAndDoesNotContainsVirus(Resource fileResource, String fileName) {
        if (!clamAVService.scanFile(fileResource)) {
            log.warn(fileName + " contains virus");
            return false;
        }
        return true;
    }
}
