//using System;
//using System.Collections.Generic;
//using Newtonsoft.Json;
//using Newtonsoft.Json.Linq;

//namespace Common.Attributes
//{
//    public class JsonArrayOrObjectHandleConverter<TModel> : JsonConverter<List<TModel>>
//    {

//        public override void WriteJson(JsonWriter writer, List<TModel> value, JsonSerializer serializer)
//        {
//            serializer.Serialize(writer, value);
//        }

//        public override List<TModel> ReadJson(JsonReader reader, Type objectType, List<TModel> existingValue, bool hasExistingValue,
//            JsonSerializer serializer)
//        {
//            var token = JToken.Load(reader);
//            switch (token.Type)
//            {
//                case JTokenType.Array:
//                    return JsonConvert.DeserializeObject<List<TModel>>(token.ToString());
//                case JTokenType.Object:
//                    var resultList = new List<TModel>();
//                    resultList.Add(JsonConvert.DeserializeObject<TModel>(token.ToString()));
//                    return resultList;
//            }
            
//            throw new Exception("Invalid value");
//        }

        
//    }

//}
