const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const versionPropertiesRows = require("./datasources");
const _ = require("lodash");
const { wrapperNullableValue } = require("./utils");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "versioning.proto"),
  {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const grpcProto = grpc.loadPackageDefinition(packageDefinition).versioning;

function getVersionProperties(call, callback) {
  const result = versionPropertiesRows.map((curr) => {
    const temp = {
      id: curr.id,
      version: curr.version,
      show: wrapperNullableValue(curr.show),
      label: wrapperNullableValue(curr.label),
      priority: wrapperNullableValue(curr.priority),
    };
    return temp;
  }, []);

  console.log("Request:", call.request);
  callback(null, { result });
}

function main() {
  const server = new grpc.Server();
  server.addService(grpcProto.VersioningService.service, {
    getVersionProperties,
  });

  const addr = "0.0.0.0:50051";
  server.bindAsync(addr, grpc.ServerCredentials.createInsecure(), (err) => {
    if (err) {
      console.error("Bind error:", err);
      process.exit(1);
    }
    console.log(`gRPC server listening on ${addr}`);
  });
}

main();
